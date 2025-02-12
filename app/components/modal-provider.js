import RejectReasonModal from "@/components/modals/reject-reason-modal";
import TransactionModal from "@/components/modals/transaction-modal";

const ModalProvider = () => {
	return (
		<>
			<TransactionModal />
			<RejectReasonModal />
		</>
	);
};

export default ModalProvider;