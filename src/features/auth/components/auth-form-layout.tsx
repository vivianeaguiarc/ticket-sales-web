import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type AuthFormLayoutProps = {
  title: string
  description: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function AuthFormLayout({ title, description, children, footer }: AuthFormLayoutProps) {
  return (
    <section className="bg-brand-cream py-12 sm:py-16">
      <Container className="max-w-lg">
        <Card className="border-border bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-brand-dark">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
        {footer ? (
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        ) : null}
      </Container>
    </section>
  )
}

type TermsConsentProps = {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  error?: string
}

export function TermsConsent({ id, checked, onCheckedChange, error }: TermsConsentProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(value === true)}
          className="mt-0.5"
        />
        <Label htmlFor={id} className="text-sm leading-relaxed font-normal text-muted-foreground">
          Li e aceito os{' '}
          <Link href="/termos-de-uso" className="text-primary underline-offset-4 hover:underline">
            Termos de Uso
          </Link>{' '}
          e a{' '}
          <Link
            href="/politica-privacidade"
            className="text-primary underline-offset-4 hover:underline"
          >
            Política de Privacidade
          </Link>
          .
        </Label>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}
