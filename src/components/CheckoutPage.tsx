import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Truck,
  ShoppingBag,
  Copy,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG, PAYMENT_METHODS } from '../data/brandConfig';
import { BD_DIVISIONS } from '../data/districts';
import { OrderRecord, PaymentMethodId } from '../types/store';
import { formatTaka, isValidBdPhone, toBengaliNumber } from '../utils/formatters';
import { SafeImage } from './SafeImage';

interface CheckoutPageProps {
  onBackToShop: () => void;
}

const ORDERS_STORAGE_KEY = 'ribaz_orders_v1';

export function CheckoutPage({ onBackToShop }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [division, setDivision] = useState(BD_DIVISIONS[0].division);
  const [district, setDistrict] = useState(BD_DIVISIONS[0].districts[0]);
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const availableDistricts = useMemo(() => {
    const found = BD_DIVISIONS.find((d) => d.division === division);
    return found ? found.districts : [];
  }, [division]);

  const handleDivisionChange = (newDiv: string) => {
    setDivision(newDiv);
    const found = BD_DIVISIONS.find((d) => d.division === newDiv);
    if (found && found.districts.length > 0) {
      setDistrict(found.districts[0]);
    }
  };

  const isDhakaMetro = district.includes('ঢাকা');
  const deliveryCharge =
    subtotal >= BRAND_CONFIG.freeDeliveryThreshold
      ? 0
      : isDhakaMetro
      ? BRAND_CONFIG.deliveryChargeDhaka
      : BRAND_CONFIG.deliveryChargeOutside;

  const grandTotal = subtotal + deliveryCharge;

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      nextErrors.fullName = 'অনুগ্রহ করে আপনার নাম লিখুন।';
    }
    if (!phone.trim()) {
      nextErrors.phone = 'অনুগ্রহ করে সচল মোবাইল নম্বর দিন।';
    } else if (!isValidBdPhone(phone)) {
      nextErrors.phone = 'সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।';
    }
    if (!address.trim() || address.trim().length < 6) {
      nextErrors.address = 'অনুগ্রহ করে বাসা/রোড/এলাকাসহ সম্পূর্ণ ঠিকানা লিখুন।';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    const orderNum = `RBZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const record: OrderRecord = {
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        division,
        district,
        address: address.trim(),
        note: note.trim(),
      },
      items: [...items],
      subtotal,
      deliveryCharge,
      discountAmount: 0,
      total: grandTotal,
      paymentMethod,
      status: 'confirmed',
    };

    try {
      const existingRaw = localStorage.getItem(ORDERS_STORAGE_KEY);
      const existing: OrderRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([record, ...existing]));
    } catch {
      // Ignore storage error
    }

    setConfirmedOrder(record);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buildOrderText = (order: OrderRecord) => {
    const itemLines = order.items
      .map(
        (item, idx) =>
          `${toBengaliNumber(idx + 1)}. ${item.name} (${item.variantLabel}) × ${toBengaliNumber(
            item.quantity
          )} = ${formatTaka(item.price * item.quantity)}`
      )
      .join('\n');

    return [
      `নতুন অর্ডার — ${BRAND_CONFIG.brandNameEn} (${BRAND_CONFIG.brandNameBn})`,
      `অর্ডার নম্বর: ${order.orderNumber}`,
      `গ্রাহকের নাম: ${order.customer.fullName}`,
      `মোবাইল: ${order.customer.phone}`,
      `এলাকা: ${order.customer.district}, ${order.customer.division}`,
      `ঠিকানা: ${order.customer.address}`,
      order.customer.note ? `নোট: ${order.customer.note}` : '',
      '',
      'অর্ডারকৃত পণ্য:',
      itemLines,
      '',
      `পণ্যের মূল্য: ${formatTaka(order.subtotal)}`,
      `ডেলিভারি চার্জ: ${order.deliveryCharge === 0 ? 'ফ্রি' : formatTaka(order.deliveryCharge)}`,
      `সর্বমোট পরিশোধযোগ্য (ক্যাশ অন ডেলিভারি): ${formatTaka(order.total)}`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  // Confirmed Receipt State
  if (confirmedOrder) {
    const orderText = buildOrderText(confirmedOrder);
    const whatsappOrderLink = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      orderText
    )}`;

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(orderText);
        setCopiedSummary(true);
        window.setTimeout(() => setCopiedSummary(false), 2000);
      } catch {
        // Clipboard unsupported
      }
    };

    return (
      <section className="py-12 sm:py-16 bg-[#FAF8F3] min-h-[75vh]">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-[#153A2B]/15 p-6 sm:p-10 space-y-7">
            <div className="flex items-start gap-4 pb-6 border-b border-[#153A2B]/10">
              <div className="w-12 h-12 rounded-full bg-[#153A2B]/10 text-[#153A2B] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5E432C]">
                  অর্ডার নম্বর: {confirmedOrder.orderNumber}
                </p>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#153A2B] mt-1">
                  আপনার অর্ডারটি নিশ্চিত হয়েছে
                </h1>
                <p className="text-sm text-[#5C665E] mt-1.5 leading-relaxed">
                  ধন্যবাদ, {confirmedOrder.customer.fullName}। নিচে আপনার অর্ডারের বিস্তারিত সারাংশ
                  দেওয়া হলো। দ্রুত কনফার্মেশনের জন্য WhatsApp-এ অর্ডারের তথ্য পাঠাতে পারেন।
                </p>
              </div>
            </div>

            {/* Customer Info Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F3] p-4 rounded-xl border border-[#153A2B]/10 text-sm">
              <div>
                <span className="text-xs text-[#5C665E] block">গ্রাহক ও মোবাইল</span>
                <p className="font-semibold text-[#1A241E] mt-0.5">
                  {confirmedOrder.customer.fullName} · {confirmedOrder.customer.phone}
                </p>
              </div>
              <div>
                <span className="text-xs text-[#5C665E] block">পেমেন্ট মাধ্যম</span>
                <p className="font-semibold text-[#1A241E] mt-0.5">ক্যাশ অন ডেলিভারি</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs text-[#5C665E] block">ডেলিভারি ঠিকানা</span>
                <p className="font-medium text-[#1A241E] mt-0.5">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.district},{' '}
                  {confirmedOrder.customer.division}
                </p>
              </div>
            </div>

            {/* Items Summary */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-[#153A2B]">অর্ডারকৃত পণ্যের বিবরণ</h2>
              <div className="divide-y divide-[#153A2B]/10 border border-[#153A2B]/10 rounded-xl overflow-hidden">
                {confirmedOrder.items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="p-3.5 bg-white flex items-center justify-between gap-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-[#1A241E]">{item.name}</p>
                      <p className="text-xs text-[#5C665E]">
                        {item.variantLabel} × {toBengaliNumber(item.quantity)}
                      </p>
                    </div>
                    <span className="font-semibold text-[#153A2B] tabular-nums">
                      {formatTaka(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-2 text-sm border-t border-[#153A2B]/10">
              <div className="flex justify-between text-[#5C665E]">
                <span>পণ্যের মোট মূল্য</span>
                <span className="tabular-nums">{formatTaka(confirmedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#5C665E]">
                <span>ডেলিভারি চার্জ</span>
                <span className="tabular-nums">
                  {confirmedOrder.deliveryCharge === 0
                    ? 'ফ্রি'
                    : formatTaka(confirmedOrder.deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#153A2B] pt-2 border-t border-[#153A2B]/10">
                <span>সর্বমোট পরিশোধযোগ্য</span>
                <span className="tabular-nums">{formatTaka(confirmedOrder.total)}</span>
              </div>
            </div>

            {/* WhatsApp Send & Continue Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappOrderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-12 px-5 bg-[#153A2B] hover:bg-[#0E281D] text-[#FAF8F3] rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#D99B26]" />
                <span>WhatsApp-এ অর্ডার পাঠান</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="h-12 px-4 border border-[#153A2B]/20 hover:bg-[#FAF8F3] text-[#153A2B] rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedSummary ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? 'কপি হয়েছে' : 'তথ্য কপি করুন'}</span>
              </button>

              <button
                type="button"
                onClick={onBackToShop}
                className="h-12 px-5 border border-[#153A2B]/20 hover:bg-[#FAF8F3] text-[#153A2B] rounded-lg text-sm font-medium cursor-pointer"
              >
                আরও পণ্য দেখুন
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty Cart Guard
  if (items.length === 0) {
    return (
      <section className="py-16 bg-[#FAF8F3] min-h-[70vh] flex items-center">
        <div className="max-w-[540px] mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F2EDE2] mx-auto flex items-center justify-center">
            <ShoppingBag className="w-7 h-7 text-[#153A2B]/60" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#153A2B]">
            চেকআউটের জন্য কার্টে কোনো পণ্য নেই
          </h1>
          <p className="text-sm text-[#5C665E]">
            অর্ডার সম্পন্ন করতে অনুগ্রহ করে প্রথমে শপ থেকে আপনার পছন্দের পণ্য কার্টে যোগ করুন।
          </p>
          <button
            type="button"
            onClick={onBackToShop}
            className="px-6 py-3 bg-[#153A2B] text-[#FAF8F3] rounded-lg text-sm font-semibold hover:bg-[#0E281D] transition-colors cursor-pointer"
          >
            শপে ফিরে যান
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-14 bg-[#FAF8F3] min-h-[75vh]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#5E432C] hover:text-[#153A2B] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>কেনাকাটায় ফিরে যান</span>
        </button>

        <div className="mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#153A2B]">
            অর্ডার ও চেকআউট
          </h1>
          <p className="text-sm text-[#5C665E] mt-1">
            নিচের তথ্যগুলো পূরণ করে ক্যাশ অন ডেলিভারিতে আপনার অর্ডার নিশ্চিত করুন।
          </p>
        </div>

        <form
          onSubmit={handleSubmitOrder}
          noValidate
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Customer & Delivery Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#153A2B]/10 p-6 sm:p-8 space-y-6">
            <h2 className="font-serif text-xl font-semibold text-[#153A2B] pb-3 border-b border-[#153A2B]/10">
              ডেলিভারির তথ্য
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-sm font-medium text-[#1A241E] mb-1.5"
                >
                  গ্রাহকের নাম <span className="text-red-700">*</span>
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  className="w-full h-11 px-3.5 bg-[#FAF8F3] border border-[#153A2B]/20 rounded-lg text-sm text-[#1A241E] focus:outline-none focus:border-[#153A2B]"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-700 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-sm font-medium text-[#1A241E] mb-1.5"
                >
                  মোবাইল নম্বর <span className="text-red-700">*</span>
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full h-11 px-3.5 bg-[#FAF8F3] border border-[#153A2B]/20 rounded-lg text-sm text-[#1A241E] tabular-nums focus:outline-none focus:border-[#153A2B]"
                />
                {errors.phone && (
                  <p className="text-xs text-red-700 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="checkout-division"
                  className="block text-sm font-medium text-[#1A241E] mb-1.5"
                >
                  বিভাগ <span className="text-red-700">*</span>
                </label>
                <select
                  id="checkout-division"
                  value={division}
                  onChange={(e) => handleDivisionChange(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#FAF8F3] border border-[#153A2B]/20 rounded-lg text-sm text-[#1A241E] focus:outline-none focus:border-[#153A2B]"
                >
                  {BD_DIVISIONS.map((d) => (
                    <option key={d.division} value={d.division}>
                      {d.division}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="checkout-district"
                  className="block text-sm font-medium text-[#1A241E] mb-1.5"
                >
                  জেলা / এলাকা <span className="text-red-700">*</span>
                </label>
                <select
                  id="checkout-district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#FAF8F3] border border-[#153A2B]/20 rounded-lg text-sm text-[#1A241E] focus:outline-none focus:border-[#153A2B]"
                >
                  {availableDistricts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="checkout-address"
                className="block text-sm font-medium text-[#1A241E] mb-1.5"
              >
                সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-700">*</span>
              </label>
              <textarea
                id="checkout-address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="বাসা/ফ্ল্যাট নং, রোড নং, এলাকা বা থানার নাম লিখুন"
                className="w-full p-3.5 bg-[#FAF8F3] border border-[#153A2B]/20 rounded-lg text-sm text-[#1A241E] focus:outline-none focus:border-[#153A2B]"
              />
              {errors.address && (
                <p className="text-xs text-red-700 mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkout-note"
                className="block text-sm font-medium text-[#1A241E] mb-1.5"
              >
                প্রয়োজনীয় নোট (ঐচ্ছিক)
              </label>
              <input
                id="checkout-note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="ডেলিভারি সময় বা প্যাকেজিং সংক্রান্ত কোনো নির্দেশনা থাকলে লিখুন"
                className="w-full h-11 px-3.5 bg-[#FAF8F3] border border-[#153A2B]/20 rounded-lg text-sm text-[#1A241E] focus:outline-none focus:border-[#153A2B]"
              />
            </div>

            {/* Payment Option Section */}
            <div className="pt-4 border-t border-[#153A2B]/10 space-y-3">
              <h3 className="text-sm font-semibold text-[#153A2B]">পেমেন্ট অপশন</h3>
              <div className="space-y-2.5">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
                      method.enabled
                        ? paymentMethod === method.id
                          ? 'bg-[#FAF8F3] border-[#153A2B] cursor-pointer'
                          : 'bg-white border-[#153A2B]/15 cursor-pointer'
                        : 'bg-[#FAF8F3]/60 border-[#153A2B]/10 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      disabled={!method.enabled}
                      checked={paymentMethod === method.id}
                      onChange={() => method.enabled && setPaymentMethod(method.id)}
                      className="mt-1 accent-[#153A2B]"
                    />
                    <div>
                      <span className="text-sm font-semibold text-[#1A241E] block">
                        {method.label}
                      </span>
                      <span className="text-xs text-[#5C665E]">{method.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Order Summary Panel */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#153A2B]/10 p-6 sm:p-8 space-y-5 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl font-semibold text-[#153A2B] pb-3 border-b border-[#153A2B]/10">
              অর্ডার সারাংশ
            </h2>

            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex items-center justify-between gap-3 py-2 border-b border-[#153A2B]/8 last:border-b-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F2EDE2] shrink-0">
                      <SafeImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#1A241E] truncate">{item.name}</p>
                      <p className="text-xs text-[#5C665E] tabular-nums">
                        {item.variantLabel} × {toBengaliNumber(item.quantity)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#153A2B] tabular-nums shrink-0">
                    {formatTaka(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#153A2B]/10 space-y-2.5 text-sm">
              <div className="flex justify-between text-[#5C665E]">
                <span>পণ্যের মোট মূল্য</span>
                <span className="font-medium text-[#1A241E] tabular-nums">
                  {formatTaka(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#5C665E]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  ডেলিভারি চার্জ ({isDhakaMetro ? 'ঢাকা' : 'ঢাকার বাইরে'})
                </span>
                <span className="font-medium text-[#1A241E] tabular-nums">
                  {deliveryCharge === 0 ? 'ফ্রি' : formatTaka(deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#153A2B] pt-3 border-t border-[#153A2B]/10">
                <span>সর্বমোট</span>
                <span className="tabular-nums">{formatTaka(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#153A2B] hover:bg-[#0E281D] text-[#FAF8F3] rounded-lg text-sm sm:text-base font-semibold transition-colors cursor-pointer"
            >
              অর্ডার নিশ্চিত করুন
            </button>

            <p className="text-xs text-[#5C665E] text-center leading-relaxed">
              অর্ডার নিশ্চিত করার পর WhatsApp-এর মাধ্যমেও আপনার অর্ডারের সম্পূর্ণ বিবরণ পাঠাতে
              পারবেন।
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
