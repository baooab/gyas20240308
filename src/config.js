export const VideoBreakPoints = {
  HaveASeat: { second: 10.8, src: 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/have_a_seat.png' },
  GenPoster: { second: 44, src: 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/get_poster.png' }
}

export const VideoTimeBreakPoints = Object.values(VideoBreakPoints).reduce((res, curr) => {
  res[curr.second] = curr
  return res
}, {})

export const AudioChangeBreakPoint = {
  Phase1: { second: 0, src: 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/audio/01.mp3' },
  Phase2: { second: 18, src: 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/audio/02.mp3' }
}
