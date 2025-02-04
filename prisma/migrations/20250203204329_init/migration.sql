-- CreateTable
CREATE TABLE "launchpads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "locality" TEXT,
    "region" TEXT[],
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "launch_attempts" INTEGER,
    "launch_successes" INTEGER,
    "rockets" TEXT[],
    "timezone" TEXT,
    "status" TEXT,
    "details" TEXT,
    "images" JSON,
    "launches" TEXT[],

    CONSTRAINT "launchpads_pkey" PRIMARY KEY ("id")
);
