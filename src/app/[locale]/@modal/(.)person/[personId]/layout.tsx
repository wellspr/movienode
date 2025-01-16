import { Modal } from "@/components/Modal";

export default function Layout({children}:{children: React.ReactNode}) {
    return <Modal showCloseButton>{children}</Modal>
}