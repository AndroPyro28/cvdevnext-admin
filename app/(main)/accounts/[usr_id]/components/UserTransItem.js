import Link from "next/link";
import { DateTime } from "luxon";

// styles
import usrprof from "../usrprof.module.css";
import { useModal } from "@/hooks/useModalStore";


export default function UserTransItem(props) {

    const {onOpen} = useModal()
    const { transactionInfo } = props;

    const { trn_type, trn_created_at } = transactionInfo;
    const formattedDate = DateTime.fromISO(trn_created_at).toFormat("MMMM yyyy");    

    return (
        <div className={usrprof.usertrans_list_item_container}>
            <p className={usrprof.usertrans_list_item}>{`${trn_type} - ${formattedDate}`}</p>
            <Link className={usrprof.usertrans_list_item_cta} href={`#`} onClick={() => onOpen("transaction-modal", transactionInfo)}>VIEW</Link>
        </div>
    )
}