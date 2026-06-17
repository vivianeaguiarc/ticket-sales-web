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
  type RegisterCustomerFormValues,
  registerCustomerSchema
} from '@/features/auth/validations/auth-schemas'
import { getRegisterErrorMessage } from '@/lib/api/api-error'

export function RegisterCustomerForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterCustomerFormValues>({
    resolver: zodResolver(registerCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      address: '',
      phone: '',
      acceptTerms: false
    }
  })

  const onSubmit = handleSubmit(async ({ acceptTerms: _, ...values }) => {
    setIsSubmitting(true)

    try {
      await authService.registerCustomer(values)
      await login({ email: values.email, password: values.password })

      toast.success('Conta criada com sucesso.')
      router.replace(getDashboardPath('customer'))
    } catch (error) {
      toast.error(getRegisterErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  })

  return (
    <AuthFormLayout
      title="Criar conta de cliente"
      description="Cadastre-se para reservar e comprar ingressos."
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
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
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

        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            autoComplete="street-address"
            aria-invalid={Boolean(errors.address)}
            {...register('address')}
          />
          {errors.address ? (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            aria-invalid={Boolean(errors.phone)}
            {...register('phone')}
          />
          {errors.phone ? <p className="text-sm text-destructive">{errors.phone.message}</p> : null}
        </div>

        <Controller
          name="acceptTerms"
          control={control}
          render={({ field }) => (
            <TermsConsent
              id="acceptTermsCustomer"
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
          {isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </form>
    </AuthFormLayout>
  )
}
