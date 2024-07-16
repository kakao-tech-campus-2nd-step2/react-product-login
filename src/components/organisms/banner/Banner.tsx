import Container from '@components/atoms/container/Container';
import { backgroundColors } from '@styles/colors';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import { useContext } from 'react';
import { ThemeName, ThemeSubtitle, ThemeTitle } from './Banner.styles';
import { ThemeContext } from '@/providers/ThemeContextProvider';

interface BannerProps {
  themeKey: string;
}

function Banner({ themeKey }: BannerProps) {
  const { themes } = useContext(ThemeContext);
  const theme = themes[themeKey];

  return (
    <Container backgroundColor={theme?.backgroundColor || backgroundColors.containerDark} elementSize="full-width" justifyContent="center">
      <Container maxWidth={MAX_CONTENT_WIDTH} elementSize="full-width" padding="50px 20px">
        <Container flexDirection="column">
          <ThemeName>
            {theme?.label}
          </ThemeName>
          <ThemeTitle>
            {theme?.title}
          </ThemeTitle>
          <ThemeSubtitle>
            {theme?.description}
          </ThemeSubtitle>
        </Container>
      </Container>
    </Container>
  );
}

export default Banner;
