// DatabaseError inherits from Error class and uses all Error functionality.
// DatabaseError is used in repository layer, in database operations.
export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
    }
}