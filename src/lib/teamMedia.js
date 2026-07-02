export const MEMBER_PHOTOS = [
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836628/ismoil_xidjbj.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836640/abdulaziz_rnwa2w.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836640/davronbek_f3n4xy.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836642/zafar_pfg6vk.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836635/faridun_katq6l.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1781548006/image_kx2hrm.png',
  'https://res.cloudinary.com/dgreqtwk6/image/upload/v1778836641/ahadjon_vhdpih.png',
];

export const MEMBER_VIDEOS = [
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385694/Ismoil_l77uzq.mp4',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781548211/IMG_9499_hkieor.mp4',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385710/2_tzezem.mp4',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385660/zafar_wcybb8.mp4',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385723/IMG_9470_1_arpoee.mov',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385684/IMG_9416_glelrs.mov',
  'https://res.cloudinary.com/dgreqtwk6/video/upload/v1781385700/Ahadjon_1_xjp8sz.mp4',
];

function applyCloudinaryVideoTransform(url, transform) {
  const marker = '/video/upload/';
  const index = url.indexOf(marker);
  if (index === -1) return url;

  const prefix = url.slice(0, index + marker.length);
  const suffix = url.slice(index + marker.length);
  if (!/^v\d+\//.test(suffix)) return url;

  return `${prefix}${transform}/${suffix}`;
}

/** Kichik carousel kartalari uchun — past sifat, kichik o'lcham, H.264 */
export function getCarouselVideoUrl(url) {
  return applyCloudinaryVideoTransform(url, 'vc_h264,f_mp4,q_auto:low,w_400,c_fill');
}

/** Modal va player uchun — brauzer mos H.264 MP4 */
export function getFullVideoUrl(url) {
  return applyCloudinaryVideoTransform(url, 'vc_h264,f_mp4,q_auto');
}

function applyCloudinaryImageTransform(url, transform) {
  const marker = '/image/upload/';
  const index = url.indexOf(marker);
  if (index === -1) return url;

  const prefix = url.slice(0, index + marker.length);
  const suffix = url.slice(index + marker.length);
  if (!/^v\d+\//.test(suffix)) return url;
  if (suffix.includes(`${transform}/`)) return url;

  return `${prefix}${transform}/${suffix}`;
}

/** Responsive rasm — mobil kichik, desktop katta */
export function getOptimizedImageUrl(url, width = 400) {
  if (!url) return url;
  return applyCloudinaryImageTransform(url, `f_auto,q_auto,w_${width}`);
}

export function getPosterImageUrl(url) {
  return getOptimizedImageUrl(url, 400);
}

export function getYoutubeEmbedId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0];
    if (u.pathname.includes('/shorts/')) return u.pathname.split('/shorts/')[1]?.split('/')[0];
    const v = u.searchParams.get('v');
    if (v) return v;
    if (u.pathname.startsWith('/embed/')) return u.pathname.split('/embed/')[1]?.split('/')[0];
  } catch {
    return null;
  }
  return null;
}
