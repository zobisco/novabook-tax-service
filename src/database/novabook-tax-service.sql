// Paste this into https://dbdiagram.io/d to view diagram structure.

Table Transaction {
    id        TEXT PK
    eventType TEXT UNIQUE
    date      TEXT UNIQUE
    invoiceId TEXT
    amount    INTEGER
}

Table SaleItem {
    id            TEXT PK
    transactionId TEXT
    itemId        TEXT UNIQUE
    cost          INTEGER UNIQUE
    taxRate       REAL UNIQUE
}

Table SaleAmendment {
    id          TEXT PK
    date        TEXT UNIQUE
    invoiceId   TEXT UNIQUE
    itemId      TEXT UNIQUE
    cost        INTEGER UNIQUE
    taxRate     REAL UNIQUE
    taxPosition REAL
}

// Relationships
Ref: "SaleItem"."transactionId" > "Transaction"."id"
