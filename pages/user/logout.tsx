import { useSetAccessToken, useSetUser } from "../../state/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Page } from "../../components/Page";
import { Button, ButtonProps } from "rebass";

export default function LogoutPage() {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const router = useRouter();

  useEffect(() => {
    setAccessToken("");
    setUser(undefined);
    router.push("/");
  }, []);

  return <Page heading="Abmelden"></Page>;
}

type LogoutButtonProps = ButtonProps & {
  onSuccess?: Function;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onSuccess,
  ...props
}) => {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const router = useRouter();

  function onLogout() {
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/");
    }
    // otherwise we get flickering / page redrawing...
    setTimeout(() => {
      setAccessToken("");
      setUser(undefined);
    }, 700);
  }
  return (
    <Button onClick={() => onLogout()} {...props}>
      Abmelden
    </Button>
  );
};
