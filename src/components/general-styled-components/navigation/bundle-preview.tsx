import { cardShadow } from '@/constants/shadow';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { styled, useTheme } from 'styled-components/native';

const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.white};
  ${cardShadow}
`;

const Collage = styled.View`
  width: 65px;
  height: 65px;
  flex-direction: row;
  gap: 2px;
`;

const Column = styled.View`
  flex: 1;
  gap: 2px;
`;

const Cell = styled(Image) <{ $shade: string }>`
  flex: 1;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background-color: ${({ $shade }) => $shade};
`;

const Header = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const RowTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  color: ${({ theme }) => theme.colors.black};
`;

const RowSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme }) => theme.colors.black};
`;

type BundlePreviewProps = { title: string; subtitle: string; photos: (string | undefined)[]; onPress: () => void };

export function BundlePreview({ title, subtitle, photos, onPress }: BundlePreviewProps) {
  const theme = useTheme();
  const [first, second, third] = photos.filter(Boolean);
  const source = (uri?: string) => (uri ? { uri } : undefined);

  return (
    <Container accessibilityRole="button" accessibilityLabel={`${title}, ${subtitle}`} onPress={onPress}>
      <Collage>
        <Cell source={source(first)} contentFit="cover" $shade={theme.colors.grey} />
        <Column>
          <Cell source={source(second)} contentFit="cover" $shade={theme.colors.border} />
          <Cell source={source(third)} contentFit="cover" $shade={theme.colors.darkGrey} />
        </Column>
      </Collage>
      <Header>
        <RowTitle>{title}</RowTitle>
        <RowSubtitle>{subtitle}</RowSubtitle>
      </Header>
      <SymbolView name="chevron.right" size={18} weight="bold" tintColor={theme.colors.primary} />
    </Container>
  );
}