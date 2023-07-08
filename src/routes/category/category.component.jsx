import { Fragment } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import ProductCard from "../../components/product-card/product-card.component";

// import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer, Title } from "./category.styles";
import Spinner from "../../components/spinner/spinner.component";
import { gql, useQuery } from "@apollo/client";

//Lo que va dentro de gql `blob` son blobs de sql
const GET_CATEGORY = gql`
  query ($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;
// const SET_CATEGORY = gql`
//   mutation ($category: Category!){
//     addCategory(category: $category){
//       id
//       title
//       items {
//         id
//         name
//         price
//         imageUrl
//       }
//     }
//     }
//   }
// `;

const Category = () => {
  const { category } = useParams();

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: {
      title: category,
    },
    onError: (err) => {
      console.error(err);
    },
  });

  //GQL MUTATION
  // const [addCategory, { loadingMutation, errorMutation, dataMutation }] =
  //   useMutation(SET_CATEGORY);
  //PARA LLAMAR LA MUTACION
  // addCategory({ variables: { category: categoryObject } });

  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   if (data) {
  //     const {
  //       getCollectionsByTitle: { items },
  //     } = data;
  //     setProducts(items);
  //   }
  // }, [data, category]);
  const products = data?.getCollectionsByTitle?.items || [];
  // useEffect(() => {
  //   setProducts(categoriesMap[category]);
  // }, [category, categoriesMap]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <Title>{category.toUpperCase()}</Title>
          <CategoryContainer>
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </CategoryContainer>
        </>
      )}
    </>
  );
};
Category.propTypes = {
  category: PropTypes.string.isRequired,
};
export default Category;
