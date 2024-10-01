import filesystem from 'fs'

export const createLogTxt = async (log) => {
  const date = log.timestamp

  await filesystem.promises.writeFile(
    `./logs/id-${log.id}_${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.txt`, 
    `[ID: ${log.id}] [${log.level.toUpperCase()}] [${log.module}] [${date.toLocaleString()}] ${log.message}`, 
    'utf-8'
  )
}