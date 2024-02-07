-- CreateTable
CREATE TABLE "deldelivery" (
    "id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "quantity" INTEGER,
    "price" DECIMAL,
    "company" VARCHAR(255),
    "deliverydate" DATE,
    "arrivaldate" DATE,

    CONSTRAINT "deldelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery" (
    "id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "quantity" INTEGER,
    "price" DECIMAL,
    "company" VARCHAR(255),
    "deliverydate" DATE NOT NULL,
    "arrivaldate" DATE,

    CONSTRAINT "delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "type_id" INTEGER,
    "quantity" INTEGER,
    "id" SERIAL NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemtype" (
    "name" VARCHAR(255),
    "id" INTEGER NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deldelivery_id_key" ON "deldelivery"("id");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_id_key" ON "delivery"("id");

-- AddForeignKey
ALTER TABLE "deldelivery" ADD CONSTRAINT "deldelivery_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "itemtype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "itemtype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "itemtype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

