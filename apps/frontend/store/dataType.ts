// we may share this thing, let see apis/handlerBaseType
export type JSONResponseResultType<T> = {
    status: "OK" | "CREATED" | "NOTFOUND" | "ERROR"
    data?: T,
    message?: string
    errors?: unknown
}

export type DataResult<T extends object> = {id: string} & T