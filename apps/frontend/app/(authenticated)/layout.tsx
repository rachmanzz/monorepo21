import AuthResolverProvider from "@/components/AuthResolverProvider";
import NavbarComponent from "@/components/NavbarComponent";
import StoreProvider from "@/components/StoreProvider";
import { Box } from "@mui/material";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (<AuthResolverProvider>
    <StoreProvider>
      <NavbarComponent />
      <Box sx={{ py: 3 }}>{children}</Box>
    </StoreProvider>
  </AuthResolverProvider>)
}