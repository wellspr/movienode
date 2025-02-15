import { Modal } from "@/components/Modal";

export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Modal>
            {children}
        </Modal>
    );
}