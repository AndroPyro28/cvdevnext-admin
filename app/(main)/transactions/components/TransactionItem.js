import Link from "next/link";
import { DateTime } from "luxon";

// styles
import transactions from "../transactions.module.css";

export default function TransactionItem(props) {
  const { trn_id, trn_created_at, trn_type, trn_user_init, trn_status } = props.transInfo;

  const formattedDate = DateTime.fromISO(trn_created_at).toFormat("MMMM dd, yyyy");
  

    return (
        <div className={transactions.main_list_item_container}>
          <div className={transactions.list_item_trnid_div}>
            <p className={transactions.list_item_trnid}>{trn_id}</p>
          </div>
          <div className={transactions.list_item_date_div}>
            <p className={transactions.list_item_date}>{formattedDate}</p>
          </div>
          <div className={transactions.list_item_type_div}>
            <p className={transactions.list_item_type}>{trn_type}</p>
          </div>
          <div className={transactions.list_item_user_div}>
            <p className={transactions.list_item_user}>{trn_user_init}</p>
          </div>
          <div className={transactions.list_item_status_div}>
            <p className={transactions.list_item_status}>{trn_status}</p>
          </div>
          <div className={transactions.list_item_cta_div}>
            <Link className={transactions.list_item_cta} href={`/transactions/${trn_id}`}>View Info</Link>
          </div>
        </div>
    )
}