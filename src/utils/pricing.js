/** Склонение «N устройств» (как в боте). */
export function devicesLabel(n) {
  const num = Math.abs(Number(n));
  const mod10 = num % 10;
  const mod100 = num % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${num} устройств`;
  if (mod10 === 1) return `${num} устройство`;
  if (mod10 >= 2 && mod10 <= 4) return `${num} устройства`;
  return `${num} устройств`;
}

export function proMainSlotLabel(devices) {
  return `PRO — ${devicesLabel(devices ?? 5)}`;
}

/** Локальный расчёт (дублирует tariff_resolve); для UI до ответа API. */
export function estimateSubscriptionPrice(months, devices, extraDeviceRub = { 1: 50, 3: 120 }) {
  const m = Number(months);
  const d = Math.max(5, Math.min(15, Number(devices)));
  const base = m === 3 ? 749 : 299;
  const step = extraDeviceRub[m] ?? extraDeviceRub[1] ?? 50;
  return base + Math.max(0, d - 5) * step;
}

export function subscriptionSlotsForUi(sub, mainDevices = 5) {
  const slots = [
    {
      key: 'pro_5',
      urlKey: 'pro_5_url',
      devices: mainDevices,
      label: proMainSlotLabel(mainDevices),
    },
  ];
  if (sub?.pro_3?.active) {
    slots.push({
      key: 'pro_3',
      urlKey: 'pro_3_url',
      devices: 3,
      label: 'PRO — 3 устройства',
    });
  }
  if (sub?.pro_10?.active) {
    slots.push({
      key: 'pro_10',
      urlKey: 'pro_10_url',
      devices: 10,
      label: 'PRO — 10 устройств',
    });
  }
  return slots;
}
