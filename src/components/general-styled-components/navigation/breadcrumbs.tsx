import { Link, type Href } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Fragment } from 'react';
import { styled, useTheme } from 'styled-components/native';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const CrumbText = styled.Text<{ $current: boolean }>`
  flex-shrink: ${({ $current }) => ($current ? 1 : 0)};
  font-family: ${({ theme }) => theme.fonts.black};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration-line: ${({ $current }) => ($current ? 'underline' : 'none')};
`;

type Crumb = { label: string; href?: Href };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
    const theme = useTheme();
    return (
        <Row>
            {items.map((item, index) => {
                const isCurrent = index === items.length - 1;
                return (
                    <Fragment key={`${item.label}-${index}`}>
                        {index > 0 && <SymbolView name="chevron.left" size={12} weight="bold" tintColor={theme.colors.border} />}
                        {item.href && !isCurrent ? (
                            <Link href={item.href}>
                                <CrumbText $current={false}>{item.label}</CrumbText>
                            </Link>
                        ) : (
                            <CrumbText $current numberOfLines={1} accessibilityRole="header">
                                {item.label}
                            </CrumbText>
                        )}
                    </Fragment>
                );
            })}
        </Row>
    );
}