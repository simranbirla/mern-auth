import {Request} from 'express'

export type TRequestBody<T> = Request & {
    body: T
}