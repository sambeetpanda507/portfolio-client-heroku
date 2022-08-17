import moment from 'moment'

export function errorLog(msg: string, location?: string) {
  const errorMsg: string = location
    ? `[error] || [${moment().format(
        'MMMM Do YYYY, h:mm a'
      )}] || ${msg} || ${location}`
    : `[error] || [${moment().format('MMMM Do YYYY, h:mm a')}] || ${msg}`

  console.error(errorMsg)
}
