import Link from "next/link";
import { DateTime } from "luxon";

// styles
import statements from "../statements.module.css";


export default function StatementListItem(props) {
    const { propId, statement } = props;
    const { bll_bill_cov_period, bll_id, bll_pay_stat } = statement;

    // Format the bll_bill_cov_period using Luxon
    const formattedPeriod = DateTime.fromFormat(bll_bill_cov_period, "yyyy-MM")
        .toFormat("MMMM yyyy");

    return (
        <div className={statements.statements_list_item_div}>
            <div className={statements.statements_list_item_date_div}>
                <p className={statements.statements_list_item_date}>{formattedPeriod}</p>
            </div>
            <div className={statements.statements_list_item_id_div}>
                <p className={statements.statements_list_item_id}>{bll_id}</p>
            </div>
            <div className={statements.statements_list_item_status_div}>
                <p className={statements.statements_list_item_status}>PAID</p>
            </div>
            <div className={statements.statements_list_item_cta_div}>
                <Link className={statements.statements_list_item_cta} href={`/properties/${propId}/statements/${bll_id}`}>View Info</Link>
            </div>
        </div>
    )
}