import { ElMessage } from 'element-plus'

export const showSuccessMessage = (message: string) => ElMessage({ type: 'success', message })

export const clone = (obj: any) => JSON.parse(JSON.stringify(obj))
