export function normalizeIp(ip) {
  if (!ip || typeof ip !== 'string') return "Noma'lum";
  const trimmed = ip.trim();
  if (trimmed.startsWith('::ffff:')) return trimmed.slice(7);
  return trimmed;
}

export function isPrivateIp(ip) {
  const normalized = normalizeIp(ip);
  if (!normalized || normalized === "Noma'lum") return true;
  if (normalized === '::1' || normalized === '127.0.0.1') return true;
  if (normalized.startsWith('10.')) return true;
  if (normalized.startsWith('192.168.')) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(normalized)) return true;
  if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true;
  if (normalized.startsWith('fe80:')) return true;
  return false;
}

function headerIp(value) {
  if (!value) return null;
  const raw = Array.isArray(value) ? value[0] : String(value).split(',')[0];
  return normalizeIp(raw);
}

export function getClientIp(req) {
  const candidates = [
    headerIp(req.headers['cf-connecting-ip']),
    headerIp(req.headers['x-real-ip']),
    headerIp(req.headers['x-forwarded-for']),
    normalizeIp(req.ip),
    normalizeIp(req.socket?.remoteAddress),
  ].filter((ip) => ip && ip !== "Noma'lum");

  const publicIp = candidates.find((ip) => !isPrivateIp(ip));
  if (publicIp) return publicIp;

  return candidates[0] || "Noma'lum";
}

export function resolveVisitIp(req, reportedIp) {
  const serverIp = getClientIp(req);
  const clientIp = normalizeIp(reportedIp);

  if (clientIp && clientIp !== "Noma'lum" && !isPrivateIp(clientIp)) {
    if (isPrivateIp(serverIp) || serverIp === "Noma'lum") {
      return clientIp;
    }
  }

  if (serverIp && serverIp !== "Noma'lum") return serverIp;
  if (clientIp && clientIp !== "Noma'lum") return clientIp;
  return "Noma'lum";
}
