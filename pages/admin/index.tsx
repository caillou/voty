import { LoggedInPage } from "../../components/Page";
import { Text, Link as A } from "rebass";
import { LogoutButton } from "../user/logout";
import Link from "next/link";
import { ReactElement } from "react";

export default function Teacher(): ReactElement {
  return (
    <LoggedInPage heading="Admin Bereich">
      <Text>
        <Link href="/admin/users">
          <A color="black">🧑🏼‍🤝‍🧑🏻 Users</A>
        </Link>
      </Text>
      <Text>
        <Link href="/admin/teams">
          <A color="black">🖖 Teams</A>
        </Link>
      </Text>
      <Text>
        <Link href="/admin/schools">
          <A color="black">🏫 Schools</A>
        </Link>
      </Text>
      <LogoutButton my={4} />
    </LoggedInPage>
  );
}
