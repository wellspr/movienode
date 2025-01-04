import { Modal } from "@/components/Modal";

export default function Layout({
    children,
    recommendations,
}: {
    children: React.ReactNode,
    recommendations: React.ReactNode,
}) {
    return <Modal>
        {children}
        {recommendations}
    </Modal>
}