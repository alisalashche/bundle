import { Image } from 'expo-image';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useTheme, styled } from 'styled-components/native';

type Size = 'small' | 'big';

const Container = styled.Pressable<{ $size: Size; $width?: number; $selected: boolean; $captioned: boolean }>`
  width: ${({ $size, $width }) => ($width ? `${$width}px` : $size === 'small' ? '31.7%' : '48.8%')};
  height: ${({ $size }) => ($size === 'small' ? 123 : 187)}px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: ${({ $selected }) => ($selected ? 2 : 1)}px;
  border-color: ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $captioned }) => ($captioned ? theme.colors.white : theme.colors.lightGray)};
`;

const Photo = styled(Image) <{ $captioned: boolean; $selected: boolean }>`
  width: 100%;
  height: ${({ $captioned }) => ($captioned ? '69%' : '100%')};
  background-color: ${({ theme }) => theme.colors.grey};
  opacity: ${({ $selected }) => ($selected ? 0.5 : 1)};
`;

const Caption = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
`;

const CardTitle = styled.Text<{ $size: Size; $selected: boolean }>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme, $size }) => ($size === 'small' ? theme.fontSizes.xs : theme.fontSizes.md)}px;
  color: ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.black)};
`;

const CardSubtitle = styled.Text<{ $size: Size }>`
  font-family: ${({ theme, $size }) => ($size === 'small' ? theme.fonts.semiBold : theme.fonts.regular)};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const Corner = styled.Pressable<{ $size: Size; $selected: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ $size }) => ($size === 'small' ? 27 : 40)}px;
  height: ${({ $size }) => ($size === 'small' ? 27 : 40)}px;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.white)};
`;

const CornerText = styled.Text<{ $size: Size }>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme, $size }) => ($size === 'small' ? theme.fontSizes.sm : theme.fontSizes.lg)}px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export type CardProps = {
    size: Size;
    title?: string;          
    subtitle?: string;
    imageUri?: string;
    badge?: string;          
    badgeIcon?: SymbolViewProps['name'];
    onBadgePress?: () => void;
    selected?: boolean;
    width?: number;         
    accessibilityLabel?: string;
    onPress: () => void;
};

export function Card({
    size,
    title,
    subtitle,
    imageUri,
    badge,
    badgeIcon,
    onBadgePress,
    selected = false,
    width,
    accessibilityLabel,
    onPress,
}: CardProps) {
    const theme = useTheme();
    const captioned = Boolean(title);
    const showCorner = selected || Boolean(badge) || Boolean(badgeIcon);

    return (
        <Container
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel ?? title}
            accessibilityState={{ selected }}
            onPress={onPress}
            $size={size}
            $width={width}
            $selected={selected}
            $captioned={captioned}
        >
            <Photo
                source={imageUri ? { uri: imageUri } : undefined}
                contentFit="cover"
                $captioned={captioned}
                $selected={selected}
            />
            {captioned && (
                <Caption>
                    <CardTitle numberOfLines={1} $size={size} $selected={selected}>
                        {title}
                    </CardTitle>
                    {subtitle && <CardSubtitle $size={size}>{subtitle}</CardSubtitle>}
                </Caption>
            )}
            {showCorner && (
                <Corner
                    disabled={!onBadgePress}
                    onPress={onBadgePress}
                    hitSlop={8}
                    accessibilityRole={onBadgePress ? 'button' : undefined}
                    $size={size}
                    $selected={selected}
                >
                    {selected ? (
                        <SymbolView name="checkmark" size={14} weight="bold" tintColor={theme.colors.white} />
                    ) : badgeIcon ? (
                        <SymbolView name={badgeIcon} size={16} tintColor={theme.colors.darkGrey} />
                    ) : (
                        <CornerText $size={size}>{badge}</CornerText>
                    )}
                </Corner>
            )}
        </Container>
    );
}