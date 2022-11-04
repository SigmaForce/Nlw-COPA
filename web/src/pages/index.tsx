interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}
import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import usersAvatarExampleImg from "../assets/users-avatar-example.png";
import logoImg from "../assets/logo.svg";
import iconCheckImg from "../assets/icon-check.svg";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });
      const { code } = response.data;
      await navigator.clipboard.writeText(code);
      alert(
        "Bolão criado com sucesso, o código foi Copiado para a área de transferência!"
      );
      setPoolTitle("");
    } catch (err) {
      alert("Falha ao Criar o Bolão, tente Novamente!");
    }
  }
  return (
    <div className="h-screen max-w-[1124px] mx-auto grid grid-cols-2 gap-28 items-center ">
      <main>
        <Image src={logoImg} alt=" Nlw Copa" quality={100} />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount} </span> pessoas
            já estão usando
          </strong>
        </div>
        <form onSubmit={createPool} className="mt-10 gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm mr-2 text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold font-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            {" "}
            Criar o Meu Bolão
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>
        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount} </span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-15 bg-gray-600"></div>
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount} </span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <div>
        <Image
          src={appPreviewImg}
          alt="Dois celulares Exibindo uma prévia da Aplicação Móvel do Nlw Copa"
          quality={100}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};
