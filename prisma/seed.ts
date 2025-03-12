import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.launchpads.deleteMany({});

  const launchpads = await prisma.launchpads.createMany({
    data: [
      {
        id: "5e9e4501f5090910d4566f83",
        name: "VAFB SLC 3W",
        full_name: "Vandenberg Space Force Base Space Launch Complex 3W",
        locality: "Vandenberg Space Force Base",
        region: ["California"],
        latitude: 34.6440904,
        longitude: -120.5931438,
        launch_attempts: 0,
        launch_successes: 0,
        rockets: ["5e9d0d95eda69955f709d1eb"],
        timezone: "America/Los_Angeles",
        status: "retired",
        details:
          "SpaceX's original west coast launch pad for Falcon 1. It was used in a static fire test but was never employed for a launch, and was abandoned due to range scheduling conflicts arising from overflying other active pads.",
        images: { large: "https://i.imgur.com/7uXe1Kv.png" },
        launches: [],
      },
      {
        id: "5e9e4502f5090927f8566f85",
        name: "CCAFS SLC 40",
        full_name: "Cape Canaveral Space Launch Complex 40",
        locality: "Cape Canaveral",
        region: ["Florida"],
        latitude: 28.562302,
        longitude: -80.577356,
        launch_attempts: 61,
        launch_successes: 59,
        rockets: ["5e9d0d95eda69973a809d1ec"],
        timezone: "America/New_York",
        status: "active",
        details:
          "SpaceX primary Falcon 9 launch pad, where all east coast Falcon 9s launched prior to the AMOS-6 anomaly. Initially used to launch Titan rockets for Lockheed Martin. Back online since CRS-13 on 2017-12-15.",
        images: { large: "https://i.imgur.com/4t8X8d8.png" },
        launches: [],
      },
    ],
  });

  console.log({ launchpads });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
