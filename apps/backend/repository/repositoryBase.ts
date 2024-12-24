import { ZodSchema } from "zod";
import { db } from "../config/firebaseConfig";

export type ResultData<T> = {id: string} & T


export default class RepositoryBase<T extends object>{
    private schema!: ZodSchema;
    private collection!: string

    protected registerSchema(collection: string, schema: ZodSchema) {
        this.collection = collection;
        this.schema = schema;
    }

    public async create(data: T): Promise<ResultData<T>> {
        if (!this.schema) throw new Error("schema not registered")
        const parseData = this.schema.parse(data)
        const createSnap = await db.collection(this.collection).add(parseData)
        const snapDoc = await createSnap.get()
        return {id: snapDoc.id, ...snapDoc.data() as T}
    }

    public setDoc(doc: string, data: T) {
        if (!this.schema) throw new Error("schema not registered")
        const parseData = this.schema.parse(data)
        return db.collection(this.collection).doc(doc).set(data)
    }

    public async getAll (): Promise<ResultData<T>[]> {
        if (!this.schema) throw new Error("schema not registered")
        const schema =  this.schema
        const all = await db.collection(this.collection).get()
        const data: ResultData<T>[] = []
        all.forEach(doc => {
            const parseData = schema.parse(doc.data())
            data.push({id: doc.id, ...parseData})
        })
        return data;
    }

    public async getOne (doc: string): Promise<ResultData<T>|null> {
        const snap = await db.collection(this.collection).doc(doc).get()
        if (!snap.exists) return null
        const parseData = this.schema.parse(snap.data())
        return {id: snap.id, ...parseData}
    }

    public async update (doc: string, data: Partial<T>) {
        return db.collection(this.collection).doc(doc).update(data)
    }

    public async delete (doc: string) {
        return await db.collection(this.collection).doc(doc).delete()
    }


    static init<M extends object, T extends RepositoryBase<M>>(this: new () => T) {
        return new this()
    }
    
}