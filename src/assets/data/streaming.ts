import i18n from '@/i18n/i18n';

const { t } = i18n.global;

export const streamimgCategories = [
  { label: t('video.movie'), value: 'movie' },
  {
    label: t('video.tomAndJerry'),
    value: 'ani',
  },
  { label: t('video.nald'), value: 'nald' },
  { label: t('video.etc'), value: 'etc' },
];
