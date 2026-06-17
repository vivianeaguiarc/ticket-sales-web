'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthFormLayout, TermsConsent } from '@/features/auth/components/auth-form-layout'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { authService } from '@/features/auth/services/auth-service'
import { getDashboardPath } from '@/features/auth/utils/route-utils'
import {
  type RegisterPartnerFormValues,
  registerPartnerSchema
} from '@/features/auth/validations/auth-schemas'
import { getRegisterErrorMessage } from '@/lib/api/api-error'

export function RegisterPartnerForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterPartnerFormValues>({
    resolver: zodResolver(registerPartnerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      company_name: '',
      acceptTerms: false
    }
  })

  const onSubmit = handleSubmit(async ({ acceptTerms: _, ...values }) => {
    setIsSubmitting(true)

    try {
      await authService.registerPartner(values)
      await login({ email: values.email, password: values.password })

      toast.success('Conta de parceiro criada com sucesso.')
      router.replace(getDashboardPath('partner'))
    } catch (error) {
      toast.error(getRegisterErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  })

  return (
    <AuthFormLayout
      title="Criar conta de parceiro"
      description="Cadastre sua empresa para publicar eventos e vender ingressos."
      footer={
        <>
          Já tem conta?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name">Nome do responsável</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company_name">Nome da empresa</Label>
          <Input
            id="company_name"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company_name)}
            {...register('company_name')}
          />
          {errors.company_name ? (
            <p className="text-sm text-destructive">{errors.company_name.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
          {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            {...register('password')}
          />
          {errors.password ? (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          ) : null}
        </div>

        <Controller
          name="acceptTerms"
          control={control}
          render={({ field }) => (
            <TermsConsent
              id="acceptTermsPartner"
              checked={field.value}
              onCheckedChange={field.onChange}
              error={errors.acceptTerms?.message}
            />
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Criando conta...' : 'Criar conta de parceiro'}
        </Button>
      </form>
    </AuthFormLayout>
  )
}
