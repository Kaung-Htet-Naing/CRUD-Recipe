"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { StyledEngineProvider } from "@mui/material/styles";
import PlainCssPriority from "@/components/CacheProvider/CacheProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className} id="root">
				<StyledEngineProvider injectFirst>
					<PlainCssPriority>{children}</PlainCssPriority>
				</StyledEngineProvider>
			</body>
		</html>
	);
}
