export async function lookupGeo(ip) {
  if (!ip || ip === "Noma'lum") {
    return { country: "Noma'lum", city: "Noma'lum" };
  }

  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,city`,
      { signal: AbortSignal.timeout(3000) },
    );
    if (!res.ok) throw new Error('geo fail');
    const data = await res.json();
    if (data.status !== 'success') throw new Error('geo fail');
    return {
      country: data.country || "Noma'lum",
      city: data.city || "Noma'lum",
    };
  } catch {
    return { country: "Noma'lum", city: "Noma'lum" };
  }
}
