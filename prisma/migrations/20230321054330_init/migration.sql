-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url1" TEXT NOT NULL,
    "url2" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);
