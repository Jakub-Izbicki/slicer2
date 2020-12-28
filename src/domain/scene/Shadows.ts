export default class Shadows {

    private static instance: Shadows;

    private enabled = false;

    public static getInstance(): Shadows {
        if (!Shadows.instance) {
            Shadows.instance = new Shadows();
        }

        return Shadows.instance;
    }

    public areEnabled(): boolean {
        return this.enabled;
    }

    public enable(): void {
        this.enabled = true;
    }

    public disable(): void {
        this.enabled = true;
    }
}
