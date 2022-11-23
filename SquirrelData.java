/**
 * GenerateRandomSquirrelTable
 */
public class SquirrelData {

    private static int idGen = 1;

    static class SquirrelSighting {

        private final static String[] ACTIVITIES = new String[] { "Climbing", "Eating", "Zigging and Zagging", "Racing",
                "Chasing" };
        private final static String[] AGES = new String[] { "Juvenile", "Adult", "Sub adult" };
        private final static String[] COLORS = new String[] { "Ci", "Gr", "Br", "Wh", "Bl", "Au", "CiGr", "GrBr",
                "WhGr", "BlBr", "CiBl" };
        private int id;
        private String colorKey;
        private String activity;
        private String age;
        private String date;
        private String time;
        private int locationId;

        public SquirrelSighting(int id, int locationId) {
            this.id = id;
            this.colorKey = getRandomColor();
            this.activity = getRandomActivity();
            this.age = getRandomAge();
            this.date = getRandomDate();
            this.time = getRandomTime();
            this.locationId = locationId;
        }

        public static int random(int min, int max) {
            return (int) Math.round(Math.random() * (max - min) + min);
        }

        private static String getRandomDate() {
            return String.format("%d-%d-%d", random(2021, 2022), random(1, 12), random(1, 28));
        }

        private static String getRandomTime() {
            return String.format("%d:%d:%d", random(0, 23), random(0, 59), random(0, 59));
        }

        private static String getRandomActivity() {
            return ACTIVITIES[random(0, ACTIVITIES.length - 1)];
        }

        private static String getRandomAge() {
            return AGES[random(0, AGES.length - 1)];
        }

        private static String getRandomColor() {
            return COLORS[random(0, COLORS.length - 1)];
        }

        @Override
        public String toString() {
            return String.format("%06d,%s,%s,%s,%s,%s,%06d", this.id, this.colorKey, this.activity, this.age, this.date,
                    this.time, this.locationId);
        }

    }

    public static void main(String[] args) {
        for (int i = 0; i < 100; ++i) {
            System.out.println(new SquirrelSighting(idGen, SquirrelSighting.random(1, 999999)));
            ++idGen;
        }
    }

}
