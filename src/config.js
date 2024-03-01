export const VideoBreakPoints = {
  HaveASeat: { second: 10.8, src: 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v2/have_a_seat.png' },
  GenPoster: { second: 48, src: 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v2/get_poster.png' }
}

export const VideoTimeBreakPoints = Object.values(VideoBreakPoints).reduce((res, curr) => {
  res[curr.second] = curr
  return res
}, {})

export const AudioChangeBreakPoint = {
  Phase2: { second: 18, src: 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v1/audio_02.MP3' }
}
