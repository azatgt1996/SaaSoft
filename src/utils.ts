import { ElMessage } from 'element-plus'

export const showSuccessMessage = (message: string) => ElMessage({ type: 'success', message })

export const clone = (obj: any) => JSON.parse(JSON.stringify(obj))

export const deepEq = (obj1: any, obj2: any) => JSON.stringify(obj1) === JSON.stringify(obj2)
