import { styled, useTheme } from "styled-components/native";
import { Card } from "./grid-card";
import { SymbolView } from "expo-symbols";
import { router } from "expo-router";

import type { Inspiration } from "@/data/inspiration";

const ScrollHorizontal = styled.ScrollView.attrs(({ theme }) => ({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { gap: theme.spacing.xs, paddingHorizontal: theme.spacing.lg, alignItems: 'center' as const },
}))`
  margin: 0 -${({ theme }) => theme.spacing.lg}px;
`;

const SeeMore = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
`;

const SeeMoreText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
  color: ${({ theme }) => theme.colors.primary};
`;

type FeedProps = {
    data: Inspiration[];
}

export function Feed({ data }: FeedProps) {
    const theme = useTheme(); 
    
    return (
        <ScrollHorizontal>
            {data.map((item) => (
                <Card
                    key={item.id}
                    size="small"
                    width={114}
                    accessibilityLabel={item.title}
                    onPress={() => router.push(`/inspiration/${item.id}`)}
                />
            ))}
            <SeeMore accessibilityRole="link" onPress={() => router.push('/inspiration')}>
                <SeeMoreText>See more</SeeMoreText>
                <SymbolView name="chevron.right" size={16} weight="bold" tintColor={theme.colors.primary} />
            </SeeMore>
        </ScrollHorizontal>
    );
}
