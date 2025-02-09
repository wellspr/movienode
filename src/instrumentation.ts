export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        console.log("Node JS");
        const { checkExpiredSessions } = await import("@/actions/db");

        setInterval(async () => {
            try {
                await checkExpiredSessions();
            }catch (err) {
                console.log(err);
            }
        }, 1000 * 60 * 60);
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
        console.log("Edge");
    }
}