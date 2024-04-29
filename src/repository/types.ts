export interface Repository<Type extends { id: unknown }> {
  getAll(): Promise<Type[]>;
  getById(id: Type["id"]): Promise<Type | null>;
}
