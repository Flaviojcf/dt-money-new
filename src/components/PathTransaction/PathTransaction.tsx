import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { CloseButton, Content, Overlay } from "./styles";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionType, TransactionTypeButton } from "../Header/styles";
import { useContext } from "react";
import { TransactionsContext } from "../../context/TransactionsContext";

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(["income", "outcome"]),
});

type NewTransactionFormInput = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModalTeste({ id }: any) {
  const { handlePatchTransaction, transactions} = useContext(TransactionsContext);

  const transactionAtt = [...transactions];
    const transactionIndex = transactionAtt.findIndex(
      (transaction) => transaction.id === id
    );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInput>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income",
    },
  });


  function handlePatch(data: NewTransactionFormInput) {
    const { description, price, category, type } = data;
    const transactionId = id;
    handlePatchTransaction({
      description,
      price,
      category,
      type,
      transactionId,
    });
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handlePatch)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register("description")}
            defaultValue={transactionAtt[transactionIndex].description}
          />
          <input
            type="number"
            placeholder="Preço"
            {...register("price", { valueAsNumber: true })}
            defaultValue={transactionAtt[transactionIndex].price}
          />

          <input
            type="text"
            placeholder="Categoria"
            {...register("category")}
            defaultValue={transactionAtt[transactionIndex].category}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Salvar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
