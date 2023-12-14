import {BackgroundImage, Body, DirectoryItemContainer} from './category-item.styles';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({category}) => {
  const {title, imageUrl} = category;
  const navigate = useNavigate();

  const navigateToDetailPage = () => {
    navigate(`/shop/${title}`)
  }
  return (
    <DirectoryItemContainer onClick={navigateToDetailPage}>
      {/* <BackgroundImage style={
        {
          backgroundImage: `url(${imageUrl})`
        }
      } /> */}

      {/*passing image url as a prop to custom component */}
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default CategoryItem;