import { Pencil, Trash } from "phosphor-react";
import { useContext } from "react";
import { Header } from "../../components/Header/Header";
import { Summary } from "../../components/Summary/Summary";
import { TransactionsContext } from "../../context/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm/SearchForm";
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModalTeste } from "../../components/PathTransaction/PathTransaction";

export function Transactions() {
  const { transactions, handleRemoveTransaction } =
    useContext(TransactionsContext);

  function onRemove(id: number) {
    handleRemoveTransaction(id);
  }
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>
                    {transaction.type === "outcome" && "- "}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                <td onClick={() => onRemove(transaction.id)}>
                  <span>
                    <Trash size={24} />
                  </span>
                </td>
                <td>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <span>
                        <Pencil
                          className="ph-pencil"
                          size={24}
                        />
                      </span>
                    </Dialog.Trigger>
                    <NewTransactionModalTeste id={transaction.id} />
                  </Dialog.Root>
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
