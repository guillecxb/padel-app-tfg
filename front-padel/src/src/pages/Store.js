// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import i18n from "i18next";
// import { Box, Stack, Typography } from "@mui/material";

// import { SearchBar } from "modules/common/inputs/SearchBar";
// // import ProductCard from "modules/Store/ProductCard";
// import ProductCard from "modules/Devices/ProductCard";
// import CardsTable from "modules/common/tables/CardsTable";
// import SectionTitle from "components/molecules/section-title/SectionTitle";

// const Store = () => {
//   const [searchRows, setSearchRows] = useState();
//   const currentLanguage = i18n.language;

//   // Datos de productos de pádel hardcodeados
//   const hardcodedResults = [
//     {
//       id: 1,
//       name: "Pala de Pádel Pro",
//       icon: "pala-padel-pro",
//       stock: 15,
//       price: 200,
//       description: "Pala de alta gama para jugadores profesionales, con excelente control y potencia.",
//     },
//     {
//       id: 2,
//       name: "Pelotas de Pádel",
//       icon: "pelotas-padel",
//       stock: 100,
//       price: 15,
//       description: "Pelotas de pádel de alta calidad, duraderas y con buen rebote.",
//     },
//     // ...otros productos
//   ];

//   const results = hardcodedResults;
//   const count = results.length;
//   const isLoading = false;
//   const error = null;

//   const products = useMemo(() => {
//     return searchRows || results;
//   }, [results, searchRows]);

//   return (
//     <>
//       <SectionTitle data-testid="section-title" title="Tienda de Pádel" />
//       <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={2}>
//         <Typography data-testid="services-count" variant="h5">
//           {`Total de productos: ${count}`}
//         </Typography>
//         <Box width={496}>
//           <SearchBar
//             data-testid="search-bar"
//             disabled={isLoading || !!error}
//             label="Buscar productos"
//             searchOverFields={["name", "description"]}
//             searchPlaceholder="Buscar palas, pelotas, ropa..."
//             setRows={setSearchRows}
//             tableRows={results}
//             variant="filled"
//           />
//         </Box>
//       </Stack>

//       <Box data-testid="services-list" mt={3}>
//         <CardsTable
//           data-testid="services-table"
//           empty={!results?.length}
//           error={error}
//           isLoading={isLoading}
//           translationKey="store"
//         >
//           {products?.map((product) => (
//             <ProductCard product={product} key={`product-${product.id}`} />
//           ))}
//         </CardsTable>
//       </Box>
//     </>
//   );
// };

// export default Store;
