import { FormSystem } from "@/app/(root)/_components/message-form/form-system";

export default function MessageForm() {
  return (
    <div id="message" className="w-full px-4 relative flex justify-center items-center">
      <div className="max-w-[800px] py-20 relative w-full flex flex-col gap-8 justify-center items-center">
        <div className="flex gap-8 w-full flex-col md:flex-row justify-center items-center">
          <header className="flex gap-2 md:w-1/2 flex-col justify-center items-center md:items-start">
            <h2 className="text-2xl text-center md:text-start font-bold capitalize">Need a hand with a project?</h2>
            <p className="text-center text-muted-foreground md:text-start">Send me a message — I’m always open to collaborate.</p>
          </header>

          <FormSystem />
        </div>
      </div>
    </div>
  );
}
