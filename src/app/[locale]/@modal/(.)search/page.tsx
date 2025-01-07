import { Modal } from "@/components/Modal";
import { Search } from "@/components/Search";
import { Locale } from "@/i18n/types";

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {

    const { locale } = await params;

    return (
        <Modal>
            <Search locale={locale} />
        </Modal>
    );
}